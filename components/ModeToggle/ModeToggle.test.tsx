import { useTheme } from "next-themes";
import { type Mock } from "vitest";

import { render, screen } from "../../lib/test-utils";

import { ModeToggle } from "./ModeToggle";

vi.mock("next-themes", () => {
  return {
    useTheme: vi.fn(),
  };
});

describe("ModeToggle", () => {
  it("should trigger the setTheme function when clicked", async () => {
    const setThemeStub = vi.fn();
    const useThemeStub = vi.fn().mockReturnValue({ setTheme: setThemeStub });
    (useTheme as Mock).mockImplementation(useThemeStub);

   const {user} = render(<ModeToggle />);

    expect(setThemeStub).not.toHaveBeenCalled();

    await user.click(screen.getByText('Toggle theme'));

    expect(setThemeStub).toHaveBeenCalled();
  });
});
