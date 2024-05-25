import React, {useState} from "react";
import JournalItem from "./JournalItem";
import {List} from "antd";

const JournalList = ({ journalData }) => {
    return (
        <div className="wrap">
            <div className="title clrfix">
                <h2 className="lf">攻略游记</h2>
            </div>
        <List grid={{gutter: 20, column: 1}}
              dataSource={journalData}
              pagination={{
                  onChange: page => {
                  },
                  pageSize: 3,
              }}
              renderItem={item => (
                  <List.Item>
                      <JournalItem info={item} />
                  </List.Item>
              )}
        />
        </div>



    );
}

export default JournalList;