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
            'start' => date('Y:m:d m:s'),
            'end' => date('Y:m:d m:s'),
             ]);
        return response()->json(['status' => 'success']);
    }

    public function stop(Request $request)
    {
        $Entry = Entry::find($request->get('id'));
        $Entry->end = date('Y:m:d m:s');
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
