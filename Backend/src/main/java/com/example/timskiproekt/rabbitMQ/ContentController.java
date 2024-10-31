package com.example.timskiproekt.rabbitMQ;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contents")
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private Producer rabbitMQProducer;

    @GetMapping
    public List<Content> getAllContents() {
        return contentRepository.findAll();
    }

    @PostMapping
    public Content createContent(@RequestBody Content content) {
        Content savedContent = contentRepository.save(content);
        // Send URL to RabbitMQ
        rabbitMQProducer.sendMessage(content.getUrl());
        return savedContent;
    }
}
