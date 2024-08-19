import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  const supabase = createClient();

  try {
    const { data } = await axios.get('https://www.nasa.gov/news/all-news/');
    const $ = cheerio.load(data);

    const newsList: {
      title: string;
      link: string;
      image: string;
      description: string;
      read_time: number;
      category: string;
    }[] = [];

    $('.hds-content-item').each((index, element) => {
      const titleElement = $(element).find('.hds-content-item-heading');
      const title = titleElement.text().trim();
      const link = titleElement.attr('href')?.trim() || '';
      const imageElement = $(element).find('img');
      const image = imageElement.attr('src')?.trim() || '';
      const descriptionElement = $(element).find(
        '.margin-top-0.margin-bottom-1',
      );
      const description = descriptionElement.text().trim();
      const readTimeElement = $(element).find('.hds-content-item-readtime');
      const read_timeText = readTimeElement.text().trim();
      const read_time = parseFloat(read_timeText.match(/[\d\.]+/)?.[0] || '0');
      const categoryElement = $(element).find(
        '.display-flex.flex-align-center.label.color-carbon-60 span',
      );
      const category = categoryElement.text().trim();

      if (title && link) {
        newsList.push({
          title,
          link: link.startsWith('http') ? link : `https://www.nasa.gov${link}`,
          image: image.startsWith('http')
            ? image
            : `https://www.nasa.gov${image}`,
          description,
          read_time,
          category,
        });
      }
    });

    // Supabase에 데이터 저장
    for (const news of newsList) {
      const { error } = await supabase.from('news').upsert(news, {
        onConflict: 'title,link',
      });

      if (error) {
        console.error('Error inserting data:', error);
      }
    }

    return NextResponse.json({ news: newsList });
  } catch (error) {
    console.error('Error fetching the data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
