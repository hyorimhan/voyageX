import * as ChannelService from '@channel.io/channel-web-sdk-loader';

export const initializeChannelService = async () => {
  try {
    console.log('Loading Channel.io script...');
    ChannelService.loadScript();
    console.log('Channel.io script loaded.');

    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY as string,
    });
    console.log('Channel.io initialized successfully');
  } catch (error) {
    console.error('Channel.io initialization error:', error);
    throw error;
  }
};
