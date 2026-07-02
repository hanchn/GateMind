import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ToolsPage } from "@/pages/ToolsPage";

describe("ToolsPage", () => {
  it("filters tool list by keyword", async () => {
    render(<ToolsPage />);

    await screen.findAllByText("search_tools");

    fireEvent.change(screen.getByPlaceholderText("工具名 / 业务域 / 系统"), {
      target: { value: "库存域" },
    });

    await waitFor(() => {
      expect(screen.getAllByText("query_inventory_snapshot").length).toBeGreaterThan(0);
    });

    expect(screen.queryByText("publish_product")).not.toBeInTheDocument();
  });
});
