import { render, screen } from "@testing-library/react";

import { RiskBadge } from "@/components/ui/RiskBadge";

describe("RiskBadge", () => {
  it("renders correct level label", () => {
    render(<RiskBadge level={3} />);

    expect(screen.getByText("Level 3")).toBeInTheDocument();
  });
});
