import type { ReactNode } from "react"
import { act, renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { InventoryProvider, useInventory } from "@/lib/inventory-context"
import type { Category } from "@/lib/types"
import { itemFormSchema } from "@/lib/validations/item"

const wrapper = ({ children }: { children: ReactNode }) => <InventoryProvider>{children}</InventoryProvider>

describe("itemFormSchema", () => {
  it("coerces numeric strings and allows empty currentValue", () => {
    const parsed = itemFormSchema.parse({
      name: "Test Item",
      category: "Electronics",
      purchaseDate: "2026-01-01",
      purchasePrice: "123.45",
      currentValue: "",
    })

    expect(parsed.purchasePrice).toBeCloseTo(123.45)
    expect(parsed.currentValue).toBeUndefined()
  })
})

describe("useInventory", () => {
  it("throws when used outside InventoryProvider", () => {
    expect(() => renderHook(() => useInventory())).toThrowError(
      "useInventory must be used within an InventoryProvider",
    )
  })

  it("increments category itemCount when adding an item", async () => {
    const { result } = renderHook(() => useInventory(), { wrapper })

    await waitFor(() => {
      expect(result.current.categories.length).toBeGreaterThan(0)
    })

    const before = result.current.categories.find((c: Category) => c.name === "Electronics")?.itemCount
    expect(before).toBeTypeOf("number")

    act(() => {
      result.current.addItem({
        name: "Extra Laptop",
        category: "Electronics",
        purchaseDate: "2026-01-02",
        purchasePrice: 1000,
        currentValue: 900,
        images: [],
      })
    })

    await waitFor(() => {
      const after = result.current.categories.find((c: Category) => c.name === "Electronics")?.itemCount
      expect(after).toBe((before as number) + 1)
    })
  })
})
