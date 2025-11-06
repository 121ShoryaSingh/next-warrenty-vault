import Card from '@/components/Card';
import LinkButton from '@/components/LinkButton';
import Section from '@/components/Section';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="pt-32 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      <div className="min-h-screen">
        <Section className="">
          <div className="py-5 flex flex-col md:flex-row justify-between items-center mx-auto">
            <div className="space-y-2">
              <h2 className="text-slate-200 text-2xl font-bold">
                Your Warrenties
              </h2>
              <p className="text-slate-400 ">
                Manage and track all your warranty items in one place
              </p>
            </div>
            <div className="w-full md:w-fit flex justify-center items-center">
              <LinkButton
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 duration-300 ease-in mt-2 md:mt-0 w-full md:w-fit"
                link="/addWarrentyItem"
                size="lg"
              >
                <Plus />
                Add Warrenty Item
              </LinkButton>
            </div>
          </div>
          <div>
            {/* <div className="flex ">
              <Button>All</Button>
              <Button>Active</Button>
              <Button>Expired</Button>
            </div> */}
          </div>
          <div>
            <Card />
          </div>
        </Section>
      </div>
    </div>
  );
}
