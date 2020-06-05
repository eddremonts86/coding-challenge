<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth');
    }


    public function all(Request $request)
    {
        $projects = Project::all();
        foreach ($projects as &$project) {
            $entry = Project::with('entries')->find($project->id);
            $project->TotalHours = $this->totalHours($entry->entries);
            $project->entries = count($entry->entries);
         }
         return response()->json(['data' => $projects]);
    }

    public function show(int $projectID)
    {
        $project = Project::with('entries')->find($projectID);
        return view('projects.show', ['project' => $project]);
    }


    public function showAPI(int $projectID)
    {
        $project = Project::with('entries')->find($projectID);
        return response()->json(['data' => $project]);
    }


    public function add(Request $request)
    {
        Project::create([
            'name' => $request->get('name')
        ]);
        return response()->json(['status' => 'success']);
    }

    public function update(Request $request)
    {
        $project = Project::find($request->get('id'));
        $project->name = $request->get('name');
        $project->save();
        return response()->json(['status' => 'success']);
    }

    public function findByName($projectName)
    {
        $project = Project::where('name', '=', $projectName)->take(1)->get();
        return response()->json(['data' => $project]);
    }
    public function delete(Request $request)
    {
        $project = Project::find($request->get('id'));
        $project->delete();
        return response()->json(['status' => 'success']);
    }

    public function totalHours($entries)
    {
        $total = 0;
        foreach ($entries as &$entry) {
            $time = explode( ':', $entry->total);
            $total += intval($time[0]) + intval($time[1]) / 60 + intval($time[2]) / 3600;
        }
        return round($total, 2);
    }
}
