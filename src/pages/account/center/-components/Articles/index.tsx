import { LikeOutlined, MessageFilled, StarTwoTone } from '@ant-design/icons';
import { List, Tag } from 'antd';
import React,{useEffect,useState} from 'react';
import type { ListItemDataType } from '../../-data';
import { queryFakeList } from '../../-service';
import ArticleListContent from '../ArticleListContent';
import useStyles from './index.style';
const Articles: React.FC = () => {
  const { styles } = useStyles();
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );

  const [listData,setListData] = useState([])

  // 获取tab列表数据
  const fetchData = async () => {
    const { data: listData } = await queryFakeList({
      count: 30,
    });
    setListData(listData)
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={listData?.list || []}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
            <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
            <IconText key="message" icon={<MessageFilled />} text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>Ant Design</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};
export default Articles;
