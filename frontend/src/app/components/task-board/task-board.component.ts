import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  tasks = signal<Task[]>([]);
  categories = signal<Category[]>([]);
  
  filter = signal<'all' | 'pending' | 'completed'>('all');
  
  filteredTasks = computed(() => {
    const currentFilter = this.filter();
    const allTasks = this.tasks();
    if (currentFilter === 'all') return allTasks;
    return allTasks.filter(t => t.status === currentFilter);
  });

  newTask: Task = { title: '', description: '', status: 'pending', category_id: null, due_date: null };
  isAdding = false;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadCategories();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks.set(data),
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Error loading categories', err)
    });
  }

  setFilter(status: 'all' | 'pending' | 'completed'): void {
    this.filter.set(status);
  }

  toggleAddTask(): void {
    this.isAdding = !this.isAdding;
    this.newTask = { title: '', description: '', status: 'pending', category_id: null, due_date: null };
  }

  addTask(): void {
    if (!this.newTask.title.trim()) return;
    this.taskService.createTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.update(tasks => [task, ...tasks]);
        this.toggleAddTask();
      },
      error: (err) => console.error('Error creating task', err)
    });
  }

  toggleStatus(task: Task): void {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    if(task.id) {
        this.taskService.updateTask(task.id, { ...task, status: newStatus }).subscribe({
        next: (updatedTask) => {
            this.tasks.update(tasks => tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        },
        error: (err) => console.error('Error updating task', err)
        });
    }
  }

  deleteTask(id?: number): void {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => this.tasks.update(tasks => tasks.filter(t => t.id !== id)),
      error: (err) => console.error('Error deleting task', err)
    });
  }
}
