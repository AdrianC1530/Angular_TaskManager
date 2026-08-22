<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(Task::with('category')->orderBy('created_at', 'desc')->get());
    }

    public function show($id)
    {
        $task = Task::with('category')->find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        return response()->json($task);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,completed',
            'category_id' => 'nullable|exists:categories,id',
            'due_date' => 'nullable|date'
        ]);

        $task = Task::create($request->all());

        return response()->json(Task::with('category')->find($task->id), 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $this->validate($request, [
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,completed',
            'category_id' => 'nullable|exists:categories,id',
            'due_date' => 'nullable|date'
        ]);

        $task->update($request->all());

        return response()->json(Task::with('category')->find($task->id));
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}
