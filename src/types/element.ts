export interface Element {
  id: number;
  name: string;
  elementType: 'CHAT';
  elementChat: ElementChat | null;
  createdAt: string;
  updatedAt: string;
}

export interface ElementChat {
  id: number;

  // Preset/custom pairs
  fontSizePreset: string | null;
  fontSizeCustom: number | null;
  strokePreset: string | null;
  strokeCustom: number | null;
  shadowPreset: string | null;
  shadowCustom: number | null;
  backgroundPreset: string | null;
  backgroundCustom: string | null;

  // Simple fields
  fontFamily: string;
  fontColor: string;
  fontWeight: string;
  strokeColor: string;
  shadowColor: string | null;

  // Behavior
  allCaps: boolean;
  hideCommands: boolean;
  hideBadges: boolean;
  hideBots: boolean;
  fadeEnabled: boolean;
  fadeTime: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateChatElementRequest {
  name: string;
  settings: UpdateChatElementRequest;
}

export interface UpdateChatElementRequest {
  fontSizePreset?: string;
  fontSizeCustom?: number;
  strokePreset?: string;
  strokeCustom?: number;
  shadowPreset?: string;
  shadowCustom?: number;
  backgroundPreset?: string;
  backgroundCustom?: string;
  fontFamily?: string;
  fontColor?: string;
  fontWeight?: string;
  strokeColor?: string;
  shadowColor?: string;
  allCaps?: boolean;
  hideCommands?: boolean;
  hideBadges?: boolean;
  hideBots?: boolean;
  fadeEnabled?: boolean;
  fadeTime?: number;
}
