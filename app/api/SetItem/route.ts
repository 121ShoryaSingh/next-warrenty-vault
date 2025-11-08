import { Db } from '@/lib/Db';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../(auth)/[...nextauth]/auth';
import User from '@/model/User';
import { itemSchema } from '@/types/itemSchema';
import Item from '@/model/Item';

export async function POST(req: NextRequest) {
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
    console.log(body);
    // checking item data according to db
    const result = itemSchema.safeParse(body);
    if (!result.success) {
      console.log(result.data);
      console.error(result.error);
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
      purchase_date,
      warranty_expiry_date,
      price,
      receipt_files,
      notes,
    } = result.data;

    const receiptKeys = receipt_files.map((file) => file.key);
    const receiptsForDb = receiptKeys.map((key) => ({ key }));
    console.log(receiptKeys);

    // creating item in db
    const item = await Item.create({
      owner: user._id,
      title,
      category,
      purchaseDate: new Date(purchase_date),
      warrantyExpiry: new Date(warranty_expiry_date),
      price,
      recepts: receiptsForDb,
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
