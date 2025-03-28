'use client';
import { ModeToggle } from "../components/ModeToggle";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";

export default function Home() {
    const { toast } = useToast();
    return (
        <div className=''>



            <button>
                deneme
            </button>

            <Button variant='destructive' size='lg'>
                test
            </Button>

            <Button
                onClick={() => {
                    toast({
                        title: "Scheduled: Catch up",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                    });
                }}
            >
                Show Toast
            </Button>
            <ModeToggle/>
        </div>
    );
}
