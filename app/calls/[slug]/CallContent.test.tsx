import nock from "nock";

import { render, screen } from "@/lib/test-utils";

import { CallContent } from "./CallContent";
import { MOCK_CALL } from "./__fixtures__/mock";

vi.mock('./components/ConversationList', () => ({
  ConversationList: () => <div>ConversationList</div>
}))

vi.mock('./components/MessageFeedback', () => ({
  MessageFeedback: () => <div>MessageFeedback</div>
}))

describe("CallContent", () => {
  it("should render the component", async () => {
    nock("http://localhost:3000")
      .get("/api/calls/random")
      .reply(200, MOCK_CALL);

    render(<CallContent id="random" />);

    await screen.findByText('Call details: a9971671-4dcd-4af6-b7d1-22fc11f3b4b4')

    expect(screen.getByText('AGT-76 | 6:31 | 5/8/13, 4:58:30 PM')).toBeInTheDocument();
    
    expect(screen.getByText('neutral')).toBeInTheDocument();
    expect(screen.getByText('not started')).toBeInTheDocument();

    expect(screen.getByText(/Play Call/)).toBeInTheDocument();
    
    expect(screen.getByText('Conversation')).toBeInTheDocument();
    expect(screen.getByText('ConversationList')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
    expect(screen.getByText('MessageFeedback')).toBeInTheDocument();
  });
});
