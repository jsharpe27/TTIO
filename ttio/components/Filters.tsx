'use client'

import { FunctionComponent } from "react";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, ImageIcon, Twitter, VideoIcon, BookCopyIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { PostType } from "@prisma/client";

interface FilterPostsProps {
    filters: PostType[];
}

const FilterPosts: FunctionComponent<FilterPostsProps> = ({ filters }: FilterPostsProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const query_filter = searchParams.get('filter_id');

    const handleClick = (filterId: number | null) => {
        const query = { filter_id: filterId };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query: query
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }

    return (
        <div
            className="w-full relative max-w-3xl flex flex-col gap-y-2 border-2 border-primary/50 py-4 pt-10 px-4 mt-4 "
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
                    className={cn(`flex items-center gap-x-2 font-bold uppercase`, !query_filter && 'bg-primary/20')}
                    variant={'outline'}
                    onClick={
                        () => handleClick(null)
                    }
                >
                    All
                </Button>

                {
                    filters.map((filter) => (
                        <Button
                            key={filter.id}
                            className={cn(`flex items-center gap-x-2 font-bold uppercase`, query_filter == filter.id.toString() && 'bg-primary/20')}
                            variant={'outline'}
                            onClick={
                                () => handleClick(filter.id)
                            }
                        >
                            {filter.name == 'videos' && <VideoIcon size={20} />}
                            {filter.name == 'images' && <ImageIcon size={20} />}
                            {filter.name == 'tweets' && <Twitter size={20} />}
                            {filter.name == 'articles' && <BookCopyIcon size={20} />}
                            {filter.name}
                        </Button>
                    ))
                }

            </div>

            <Separator className="my-2" />
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