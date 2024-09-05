'use client';
import React, { useEffect } from 'react';
import { Button, Card, Input, Modal, Pagination, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const scoreColor = [
  'red',
  '#ff990',
  '#181',
];

const deponents = [
  "Kathryn Murphy",
  "Courtney Henry",
  "Devon Lane",
  "Arlene McCoy",
  "Theresa Webb",
];

type Content = {
  id: string;
  deponent: string;
  content: string;
  fromTime: string;
  toTime: string;
  score: number;
};

type TopicData = {
  id: string;
  topic: string;
  topicContents: Content[];
};

type TopicHashed = {
  id: string;
  topic: string;
  contents: {
    [deponent: string]: Content[];
  };
};


function HomePage() {
  const [showModal, setShowModal] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [newTopic, setNewTopic] = React.useState<TopicHashed | null>(null);
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  const [topics, setTopics] = React.useState<TopicHashed[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [createTopicLoading, setCreateTopicLoading] = React.useState(false);

  const fetchTopics = (page: number, size: number) => {
    setPage(page);
    setSize(size);
    setLoading(true);
    fetch(`/api/topics?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(({ topics, total }) => {
        setNewTopic(null);
        setTopics(topics.map((topic: TopicData) => ({
          ...topic,
          contents: topic.topicContents.reduce((acc: { [key: string]: Content[] }, content: Content) => {
            if (!acc[content.deponent]) {
              acc[content.deponent] = [];
            }
            acc[content.deponent].push(content);
            return acc;
          }, {})
        })));
        setTotal(total);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTopics(1, 10)
  }, []);

  const initiateModal = () => {
    setTopic('');
    setShowModal(true);
  };

  const handleAddTopic = () => {
    if (!topic) return;

    setCreateTopicLoading(true);
    fetch('/api/topics', {
      method: 'POST',
      body: JSON.stringify({ topic }),
    })
      .then(res => res.json())
      .then((data: any) => {
        setNewTopic(data);
        setShowModal(false);
        fetchTopics(1, size)
      })
      .catch((error: any) => {
        console.error('Error creating topic:', error);
      })
      .finally(() => setCreateTopicLoading(false));
  };

  return (
    <>
      <Spin spinning={loading || createTopicLoading} fullscreen />
      <div className='flex-1 overflow-auto'>
        <Card className='w-fit pb-2'>
          <div className='flex bg-gray-50'>
            <div className='min-w-[250px] max-w-[250px] p-2'>
              <Button shape='circle' onClick={() => initiateModal()}><PlusOutlined /></Button>
              Topics
            </div>
            {deponents.map((deponent) => (
              <div className='min-w-[250px] max-w-[250px] p-2 border-l flex items-center' key={deponent}>
                {deponent}
              </div>
            ))}
          </div>
          {newTopic && (
            <div className='flex border-t'>
              <div className='min-w-[250px] max-w-[250px] p-2'>{newTopic.topic}</div>
              {deponents.map((deponent) => (
                <div className='min-w-[250px] max-w-[250px] p-1 border-l' key={deponent}>
                  Analyzing...
                </div>
              ))}
            </div>
          )}
          {topics.map(({ topic, contents }, index) => (
            <div className='flex border-t' key={index}>
              <div className='min-w-[250px] max-w-[250px] p-2'>{topic}</div>
              {deponents.map((deponent) => (
                <div className='min-w-[250px] max-w-[250px] p-1 border-l' key={deponent}>
                  {contents[deponent]?.map((content, index) => (
                    <div className='p-1' key={index}>
                      <div className='flex justify-between'>
                        <span>{content.fromTime} - {content.toTime}</span>
                        <span style={{
                          color: scoreColor[Math.floor(content.score * 0.03)]
                        }}>{content.score}%</span>
                      </div>
                      {content.content}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </Card>
      </div>
      <div className="flex justify-center items-center p-4">
        <Pagination
          total={total}
          pageSizeOptions={[10, 20, 50, 100]}
          showSizeChanger
          pageSize={size}
          current={page}
          onChange={(newPage, newSize) => {
            fetchTopics(newPage, newSize);
          }}
        />
      </div>
      <Modal
        title="New Topic"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => handleAddTopic()}
        okText="Done"
        okButtonProps={{ disabled: !topic }}
      >
        <span>Topic</span>
        <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
      </Modal>
    </>
  );
}

export default HomePage;
