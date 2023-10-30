import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, ImageIcon, Twitter, VideoIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface FilterPostsProps {
    
}
 
const FilterPosts: FunctionComponent<FilterPostsProps> = () => {
    return (
        <div
            className="w-full relative max-w-3xl flex flex-col gap-y-2 border-2 border-primary/50 py-4 pt-10 px-4 mt-4"
        >
            <div
                className="text-center absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-primary px-4"
            >
                Filter Content
            </div>

            <div
                className="w-full flex justify-center flex-wrap gap-x-4 gap-y-2"
            >

                <Button
                    className="flex items-center gap-x-2 font-bold uppercase"
                    variant={'outline'}
                >
                    <VideoIcon size={18} />
                    Videos
                </Button>

                <Button
                    className="flex items-center gap-x-2 font-bold uppercase"
                    variant={'outline'}
                >
                    <ImageIcon size={18} />
                    Images
                </Button>

                <Button
                    className="flex items-center gap-x-2 font-bold uppercase"
                    variant={'outline'}
                >
                    <Twitter size={18}/>
                    Tweets
                </Button>

                <Button
                    className="flex items-center gap-x-2 font-bold uppercase"
                    variant={'outline'}
                >
                    
                    Articles
                </Button>

                <Button
                    className="font-bold uppercase"
                    variant={'outline'}
                >
                    Reports
                </Button>
            </div>

            <Separator className="my-2"/>
            <div
                className="w-full flex justify-center flex-wrap gap-x-4 gap-y-2"
            >
                <Button
                    className="flex items-center gap-x-2 font-bold uppercase"
                    variant={'post'}
                >
                    Recent Posts
                </Button>

                <Button
                    className="flex items-center gap-x-2 font-bold uppercase"
                    variant={'post'}
                >
                    
                    Ratings

                    <div
                        className="hover:bg-primary/10 p-1"
                    >
                        <ArrowUp
                            size={20}
                            />
                    </div>

                    <div
                        className="hover:bg-primary/10 p-1"
                    >
                        <ArrowDown
                            size={20}
                        />
                    </div>
                </Button>

                <Button
                    className="font-bold uppercase"
                    variant={'post'}
                >
                    Old Posts
                </Button>
            </div>
        </div>
    );
}
 
export default FilterPosts;