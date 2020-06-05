<?php

namespace App\Http\Controllers;

use App\Entry;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function start(Request $request)
    {
        Entry::create([
            'project_id' => $request->get('projectId'),
            'start' => date('Y:m:d H:i:s'),
            'total' => 0,
            'status' => true,
            'end' => date('Y:m:d H:i:s'),
        ]);
        return response()->json(['status' => 'success']);
    }

    public function stop(Request $request)
    {
        $Entry = Entry::find($request->get('id'));
        $Entry->end = date('Y:m:d H:i:s');
        $total = date_diff(date_create($Entry->start), date_create($Entry->end))->format('%h:%i:%s');
        $Entry->total = $total;
        $Entry->status = false;
        $Entry->save();
        return response()->json(['status' => 'success']);
    }

    public function delete(Request $request)
    {
        $project = Entry::find($request->get('id'));
        $project->delete();
        return response()->json(['status' => 'success']);
    }
}
