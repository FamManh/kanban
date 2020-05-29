import React from 'react'
import { Carousel } from 'antd';
import styled from 'styled-components';
import taskActions from '../Task/actions'
import { useDispatch } from 'react-redux';
const Cover = styled.div`
  position: relative;
  width: 100%;
  .ant-carousel {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .slick-slider {
    width: 100%;
    height: 100%;
  }
  .slick-slide > div {
    display: flex;
  }
  .image {
    position: relative;
    background-size: cover;
    background-position: top center;
    width: 100%;
  }
  .weakColor & .image {
    -webkit-filter: invert(100%);
    filter: invert(100%);
  }
  .content {
    position: relative;
    z-index: 9;
  }
`;

const TaskItem = ({ task, provided }) => {
  const dispatch = useDispatch();
  const onClick = (taskId)=>{
    dispatch(taskActions.doSelectTask(taskId));
  }
  return (
      <div
          onClick={() => onClick(task.shortid)}
          className={`shadow-sm bg-white mb-2 rounded`}
          css={`
              position: relative;
              background-color: red;
          `}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
      >
          <div
              css={`
                  position: absolute;
                  top: 16px;
                  left: 0;
                  height: 20px;
                  width: 2px;
                  background-color: red;
              `}
              className={`bg-${task.color}`}
          />
          <div className="p-3">
              <p className="mb-1">
                  <strong>{task.title}</strong>
              </p>
              <small className="text-muted d-block clearfix">
                  {task.description?.slice(0, 98)}
                  {task.description?.length > 98 && "..."}
              </small>
          </div>
          {/* {task.images && (
              <Cover style={{ height: 150 }}>
                  <Carousel className="overflow-hidden">
                      {task.images.map((image, index) => (
                          <div key={index}>
                              <div
                                  key={index}
                                  className="image rounded-bottom"
                                  style={{
                                      backgroundImage: `url(${image})`,
                                      height: 150
                                  }}
                              />
                          </div>
                      ))}
                  </Carousel>
              </Cover>
          )} */}
      </div>
  );
};

export default TaskItem;
