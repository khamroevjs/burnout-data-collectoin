package com.burnoutstopper.gatewayservice.serivce.results

import com.burnoutstopper.gatewayservice.dto.results.ResultsByQuizDTO
import reactor.core.publisher.Mono

interface ResultsService {
    fun exists(quizId: Int, testIds: List<Int>, respondentId: Int?): Mono<Boolean>

    fun getResults(quizId: Int, testIds: List<Int>, respondentId: Int?): Mono<ResultsByQuizDTO>
}
