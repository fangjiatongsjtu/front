import React from 'react';
import {Avatar, Card, Carousel} from 'antd';
import journaldata from "../assets/journaldata";

export class JournalCarousel extends React.Component{

    createContent = (ctx, infos) => {
        const images = ctx.keys().map(ctx);
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            console.log(img);
            result.push(
                <div>
                    <img alt={i} src={img}>
                    </img>
                    {/*<Card
                         style={{
                             width:'30%',
                             background:"transparent",
                             zIndex:5,
                             left:20,
                             bottom: 150,
                             backgroundColor:"black",
                             opacity:0.4
                         }}
                          title={<span style={{color:"white"}}>{infos[i].title}</span>}>
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"/>
                        <span style={{color:"white"}}>{infos[i].author}</span>
                    </Card>*/}
                </div>
            );
        }
        return result;
    };


    render(){
        const requireContext = require.context("../assets/carousel", true, /^\.\/.*\.jpg$/);
        const infos = journaldata;

        return (
            <Carousel autoplay>
                {this.createContent(requireContext, infos)}
            </Carousel>
        )
    }
}
