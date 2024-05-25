import React, { useState } from 'react';
import {Button, Flex, Input, Tag} from 'antd';
import {postRequest} from "../util/ajax";

const MultipleUrlInput = ({onChangeImages}) => {
    const [inputValue, setInputValue] = useState("");
    const [urls, setUrls] = useState([]);
    const [images, setImages] = useState([]);
    const [finalImages, setFinalImages] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && urls.indexOf(inputValue) === -1) {
            setUrls([...urls, inputValue]);
            const new_images = [...images,{image:inputValue}];
            setImages(new_images)
            setInputValue("");
            console.log(new_images);
        }
    };

    const handleRemoveUrl = (url) => {
        setUrls(urls.filter(item => item !== url));
        const new_images = images.filter(item => item.image !== url);
        setImages(new_images);
        console.log(new_images)
    };

    const handleSubmitCallback = (data) => {
        console.log(data.data)
        const image = data.data;
        const index = images.findIndex(item => item.image === image.image)
        if (index !== -1){
            images[index] = image;
        }
        else {
            console.log("failed")
        }
    }
    /*const handleSubmit = () => {
        images.forEach(item =>{
            postRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/image",item,handleSubmitCallback);
        })
    }*/

    const  handleSubmit = async () => {
        for (let index = 0; index<images.length; index++){
            await new Promise(resolve => {
                postRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/image", images[index] ,(response) => {
                    handleSubmitCallback(response);
                    resolve();
                });
            });
        }
        console.log(images);
        onChangeImages(images)
    }

    return (
        <div>
            <Input
                placeholder="Enter an Image URL"
                value={inputValue}
                onChange={handleInputChange}
                onPressEnter={handleInputConfirm}
            />
            {urls.map(url => (
                <Tag
                    closable
                    key={url}
                    onClose={() => handleRemoveUrl(url)}
                >
                    {url}
                </Tag>
            ))}
            <Flex style={{display:"flex",justifyContent:"center", marginTop:20}} gap={32}>
                <Button type="primary"
                onClick={handleSubmit}>保存</Button>
            </Flex>
        </div>
    );
};

export default MultipleUrlInput;