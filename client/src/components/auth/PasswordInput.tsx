"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/solid/EyeSlashIcon";

const iconSize = 24;

export default function PasswordInput() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      type={isVisible ? "text" : "password"}
      label="Password"
      endContent={
        <Button
          isIconOnly
          onPress={toggleVisibility}
          className="bg-transparent"
        >
          {isVisible ? (
            <EyeSlashIcon height={iconSize} width={iconSize} />
          ) : (
            <EyeIcon height={iconSize} width={iconSize} />
          )}
        </Button>
      }
    />
  );
}
