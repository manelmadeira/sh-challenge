import nock from "nock";

import { render, screen } from "@/lib/test-utils";

import { ConversationList } from "./ConversationList";
import { MOCK_LIST } from "./__fixtures__/mocks";

describe("ConversationList", () => {
  it("should render the component", async () => {
    nock("http://localhost:3000")
      .get(`/api/calls/random/messages`)
      .reply(200, { messages: MOCK_LIST });

    render(<ConversationList id="random" onSelected={vi.fn()} />);

    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);

    // part of first message's text
    await screen.findByText(/et ultrices posuere cubilia/);

    expect(screen.getAllByTestId("conversation-message")).toHaveLength(2);
  });

  it("should trigger onSelected callback when a message is clicked on", async () => {
    const onSelectedStub = vi.fn();

    nock("http://localhost:3000")
      .get(`/api/calls/random/messages`)
       .reply(200, { messages: MOCK_LIST });

    const { user } = render(
      <ConversationList id="random" onSelected={onSelectedStub} />
    );

    // part of first message's text
    await screen.findByText(/et ultrices posuere cubilia/);

    expect(onSelectedStub).not.toHaveBeenCalled();

    await user.click(screen.getAllByTestId("conversation-message")[0]);

    expect(onSelectedStub).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "fccb2030-76fc-4923-927d-09c4b8b713fa",
      })
    );
  });
});
