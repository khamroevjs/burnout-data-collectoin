package com.burnoutstopper.gatewayservice.serivce.respondent

import com.burnoutstopper.gatewayservice.dto.respondent.RespondentDTO
import reactor.core.publisher.Mono

interface RespondentService {
    fun create(): Mono<String>
    fun getId(token: String): Mono<Int>
    fun createAndGetId(): Mono<RespondentDTO>
}
