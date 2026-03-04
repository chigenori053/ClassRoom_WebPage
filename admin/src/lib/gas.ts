type GasEventPayload = {
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  location?: string;
};

type GasResponse = {
  success: boolean;
  eventId?: string;
  error?: string;
};

const GAS_ENDPOINT = process.env.GAS_ENDPOINT!;
const GAS_SECRET = process.env.GAS_SECRET!;

async function callGas(body: Record<string, unknown>): Promise<GasResponse> {
  const res = await fetch(GAS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ ...body, secret: GAS_SECRET }),
  });
  return res.json();
}

export async function gasCreateEvent(payload: GasEventPayload): Promise<GasResponse> {
  return callGas({ action: 'create', ...payload });
}

export async function gasUpdateEvent(eventId: string, payload: GasEventPayload): Promise<GasResponse> {
  return callGas({ action: 'update', eventId, ...payload });
}

export async function gasDeleteEvent(eventId: string): Promise<GasResponse> {
  return callGas({ action: 'delete', eventId });
}
