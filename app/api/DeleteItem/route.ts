import { Db } from '@/lib/Db';
import Item from '@/model/Item';
import { NextRequest, NextResponse } from 'next/server';

export async function Delete(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        {
          message: 'Id is missing.',
        },
        { status: 400 }
      );
    }

    await Db();

    const item = Item.findByIdAndDelete({ id });

    if (!item) {
      return NextResponse.json(
        {
          message: 'Wrong id item not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Item deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to delete item', error);
    return NextResponse.json(
      { error: 'Internal server error failed to delete item' },
      { status: 500 }
    );
  }
}
