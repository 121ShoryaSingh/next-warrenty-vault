import { Db } from '@/lib/Db';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../(auth)/[...nextauth]/auth';
import User from '@/model/User';
import { itemSchema } from '@/types/itemSchema';
import Item from '@/model/Item';

export default async function POST(req: NextRequest) {
  try {
    //Checking user session
    const session = await auth();
    const sessionEmail = session?.user?.email;
    if (!sessionEmail) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // awaiting db connection
    await Db();
    // finding user if the user is valid
    const user = await User.findOne({ email: sessionEmail });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }
    const body = await req.json();
    // checking item data according to db
    const result = itemSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: 'Invalid input',
          errors: result.error,
        },
        { status: 400 }
      );
    }
    const {
      title,
      category,
      purchaseDate,
      warrantyExpiry,
      price,
      receipts,
      notes,
    } = result.data;

    // creating item in db
    const item = await Item.create({
      owner: user._id,
      title,
      category,
      purchaseDate: new Date(purchaseDate),
      warrantyExpiry: new Date(warrantyExpiry),
      price,
      receipts: receipts || [],
      notes,
    });
    // sending response if the item is created
    return NextResponse.json(
      { message: 'Item saved successfully', item: item },
      { status: 201 }
    );
  } catch (error) {
    // handling error if error during items saved
    console.error('Error creating item', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
