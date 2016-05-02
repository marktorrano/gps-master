<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Item;
use DB;

use App\Http\Requests;
use App\Http\Requests\CreateItemRequest;

class ItemController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Item::all();

        return view('items/showitems', ['items' => $items]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($product_id)
    {
        //
        return view('pages/createitemform', ['product_id' => $product_id]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CreateItemRequest $request)
    {
        //
        $item = Item::create($request->all());

        $newName = "photoItem" . $item->id . ".jpg";

        $request->file('photo')->move('images', $newName);

        DB::table('photos')->insert([
            'path'           => $newName,
            'imageable_id'   => $item->id,
            'imageable_type' => 'App\Models\Item',
            'created_at'     => Carbon::now(),
            'updated_at'     => Carbon::now()
        ]);

        $item->save();

        return redirect('/');

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $items = Item::where('product_id', '=', $id)->get();

        return view('items/showitems', ['items' => $items]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}