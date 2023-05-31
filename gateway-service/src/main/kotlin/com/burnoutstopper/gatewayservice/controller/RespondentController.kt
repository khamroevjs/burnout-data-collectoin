package com.burnoutstopper.gatewayservice.controller

import com.burnoutstopper.gatewayservice.dto.respondent.RespondentDTO
import com.burnoutstopper.gatewayservice.serivce.respondent.RespondentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/gateway/v1/respondent")
class RespondentController @Autowired constructor(private val service: RespondentService) {
    
    @PostMapping
    fun createAndGetId(): Mono<RespondentDTO> {
        return service.createAndGetId()
    }

    @GetMapping
    fun getId(@RequestParam token: String,): Mono<Int> {
        return service.getId(token)
    }
}
