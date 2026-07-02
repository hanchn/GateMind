import { fireEvent, render, screen } from "@testing-library/react";

import { TokensPage } from "@/pages/TokensPage";

describe("TokensPage", () => {
  it("creates a personal token message", async () => {
    render(<TokensPage />);

    fireEvent.change(screen.getByPlaceholderText("例如：CLI 本地调试"), {
      target: { value: "我的调试 Token" },
    });

    fireEvent.click(screen.getByText("创建 Token"));

    expect(await screen.findByText(/已创建/)).toBeInTheDocument();
  });
});
