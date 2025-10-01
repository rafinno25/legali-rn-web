import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { findGlossaryTerm } from '../data/glossary';

interface GlossaryTermProps {
  children: string;
  onPress?: () => void;
}

export function GlossaryTerm({ children, onPress }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const glossaryEntry = findGlossaryTerm(children);

  if (!glossaryEntry) {
    return <Text>{children}</Text>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Pressable
          onPress={() => {
            setOpen(true);
            onPress?.();
          }}
        >
          <Text className="text-[#3FA7CC] underline font-medium">
            {children}
          </Text>
        </Pressable>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
        <View className="gap-2">
          <Text className="text-base font-bold text-[#1B2745]">
            {glossaryEntry.term}
          </Text>
          <Text className="text-sm text-gray-600 leading-relaxed">
            {glossaryEntry.definition}
          </Text>
        </View>
      </PopoverContent>
    </Popover>
  );
}
