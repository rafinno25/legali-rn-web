import React, { useMemo, useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, StyleSheet } from "react-native";
import { useQueryCities } from "@/hooks/use-location";

type Props = {
  stateId?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export function CityDropdown({ stateId, value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const sId = stateId ? Number(stateId) : undefined;
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useQueryCities(sId);

  const items = useMemo(() => {
    const list = (data?.pages ?? []).flatMap(p => p.data);
    if (!search) return list;
    return list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  // Local debounced setter to remove lodash/debounce dependency
  const debouncedSetSearch = useCallback((val: string) => {
    // simple debounce per component render
    (debouncedSetSearch as any)._t && clearTimeout((debouncedSetSearch as any)._t);
    (debouncedSetSearch as any)._t = setTimeout(() => setSearch(val), 300);
  }, []);

  useEffect(() => {
    return () => {
      (debouncedSetSearch as any)._t && clearTimeout((debouncedSetSearch as any)._t);
    };
  }, [debouncedSetSearch]);

  return (
    <View>
      <TouchableOpacity style={[styles.input, (disabled || !stateId) && { opacity: 0.6 }]} onPress={() => setOpen(true)} disabled={!!disabled || !stateId}>
        <Text style={styles.inputText}>{items.find(i => String(i.id) === value)?.name || "Select city"}</Text>
      </TouchableOpacity>
      <Modal visible={open} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.title}>Select City</Text>
          <TextInput placeholder="Search" onChangeText={debouncedSetSearch} style={styles.search} />
          <FlatList
            data={items}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onChange?.(String(item.id));
                  setOpen(false);
                }}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.4}
          />
          <TouchableOpacity style={styles.close} onPress={() => setOpen(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14 },
  inputText: { fontSize: 15, color: "#4B5563" },
  modal: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 12 },
  search: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12 },
  item: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  itemText: { fontSize: 16, color: "#111827" },
  close: { marginTop: 12, alignSelf: "center", paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "#F3F4F6", borderRadius: 8 },
  closeText: { color: "#111827" },
});