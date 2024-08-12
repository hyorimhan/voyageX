import * as ChannelService from '@channel.io/channel-web-sdk-loader';

export const initializeChannelService = async () => {
  try {
    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY!,
    });
  } catch (error) {
    throw error;
  }
};
