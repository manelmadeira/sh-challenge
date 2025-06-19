import nock from "nock";

import { render, screen, waitFor } from "@/lib/test-utils";

import { MessageFeedback } from "./MessageFeedback";
import { MOCK_MESSAGE } from "./__fixtures__/mock";

describe("MessageFeedback", () => {
  it("should render no message selected info", () => {
    render(
      <MessageFeedback callId="random" onCancel={vi.fn()} onSubmit={vi.fn()} />
    );

    expect(screen.getByText("Select a message")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Click on any message from the conversation to provide feedback"
      )
    ).toBeInTheDocument();

    expect(screen.queryByRole("form")).toBeNull();
  });

  it("should submit form", async () => {
    const onSubmitStub = vi.fn();
    const onCancelStub = vi.fn();

    const mutationReq = nock("http://localhost:3000")
      .post("/api/calls/random/messages/fccb2030-76fc-4923-927d-09c4b8b713fa", {
        feedback: "Hello World",
        rating: "3",
        tag: "critical issue",
      })
      .reply(200, {});

    const { user } = render(
      <MessageFeedback
        callId="random"
        message={MOCK_MESSAGE}
        onCancel={onCancelStub}
        onSubmit={onSubmitStub}
      />
    );

    expect(screen.queryByText("Select a message")).toBeNull();

    expect(onCancelStub).not.toHaveBeenCalled();
    await user.click(screen.getByText('Cancel'));
    expect(onCancelStub).toHaveBeenCalled();

    expect(screen.getByText("Message Feedback"));
    await user.type(screen.getByLabelText("Message Feedback"), "Hello World");

    expect(screen.getByText("Rating")).toBeInTheDocument();
    await user.click(screen.getAllByRole("radio")[2]);

    expect(screen.getByText("Tag")).toBeInTheDocument();
    await user.click(screen.getByRole("combobox"));

    await screen.findByRole("option", { name: "Critical Issue" });
    await user.click(screen.getByRole("option", { name: "Critical Issue" }));

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mutationReq.isDone()).toBe(true);
    });
  });
});
