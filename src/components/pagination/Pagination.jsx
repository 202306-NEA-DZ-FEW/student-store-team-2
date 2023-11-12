"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Pagination, usePagination } from "pagination-react-js";
import { useEffect, useRef } from "react";

import useCheckMobileScreen from "@/hooks/UseCheckMobileScreen";

export default function PaginationComponent({ length }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isMobileScreen] = useCheckMobileScreen();
    const routerRef = useRef(true);
    // console.log("router", pathname);
    // console.log("queries", searchParams);
    const { currentPage, entriesPerPage } = usePagination(1, 12);

    useEffect(() => {
        if (routerRef.current) {
            routerRef.current = false;
            return;
        }
        let url = "";
        if (searchParams.has("page")) {
            const params = new URLSearchParams(searchParams);
            params.set("page", currentPage.get);
            url = params.toString();
        } else {
            url = searchParams.toString()
                ? `page=${currentPage.get}&${searchParams.toString()}`
                : `page=${currentPage.get}`;
        }

        router.push(pathname + "?" + url);
    }, [currentPage.get]);

    return (
        <div>
            <Pagination
                entriesPerPage={entriesPerPage.get}
                totalEntries={length}
                currentPage={{ get: currentPage.get, set: currentPage.set }}
                offset={isMobileScreen ? 0 : 2}
                classNames={{
                    wrapper:
                        "mx-auto flex h-12 w-fit flex-row justify-center gap-2 w-fit-content  border border-solid border-gray-300 p-2 rounded-md",
                    item: " w-8 flex items-center justify-center rounded-5 rounded-md cursor-pointer hover:bg-gray-200 ",
                    itemActive: "text-white bg-accent pointer-events-none",
                    navPrev:
                        "w-8 flex items-center justify-center hover:bg-gray-200 rounded-md",
                    navNext:
                        "w-8 flex items-center justify-center hover:bg-gray-200 rounded-md",
                    navStart:
                        "w-8 flex items-center justify-center hover:bg-gray-200 rounded-md",
                    navEnd: "w-8 flex items-center justify-center hover:bg-gray-200 rounded-md",
                    navPrevCustom:
                        "w-8 flex items-center justify-center hover:bg-gray-200 rounded-md",
                    navNextCustom:
                        "w-8 flex items-center justify-center hover:bg-gray-200 rounded-md",
                }}
                showFirstNumberAlways={true}
                showLastNumberAlways={true}
                navStart='&#171;'
                navEnd='&#187;'
                navPrev='&#x2039;'
                navNext='&#x203a;'
                navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
                navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
            />
        </div>
    );
}
