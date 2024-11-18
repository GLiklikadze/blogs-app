"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";

export default function NavbarSearch() {
  const [open, setOpen] = React.useState(false);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Search className="cursor-pointer" aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem
                onSelect={() => runCommand(() => console.log("Calendar"))}
              >
                <Search className="mr-2 h-4 w-4" />
                AI
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => console.log("Search Emoji"))}
              >
                <Search className="mr-2 h-4 w-4" />
                Javascript
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => console.log("Calculate"))}
              >
                <Search className="mr-2 h-4 w-4" />
                Data Science
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
