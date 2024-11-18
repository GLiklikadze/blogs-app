"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge/badge";
import { X } from "lucide-react";

export default function TagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="max-w-xxl mx-auto w-full space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Add a tag"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button onClick={addTag}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-2 py-1 text-sm">
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 text-muted-foreground hover:text-foreground"
              aria-label={`Remove ${tag} tag`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
