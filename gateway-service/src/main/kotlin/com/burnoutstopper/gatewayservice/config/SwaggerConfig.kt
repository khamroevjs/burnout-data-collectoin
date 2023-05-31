package com.burnoutstopper.gatewayservice.config

import org.springdoc.core.models.GroupedOpenApi
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cloud.gateway.route.RouteDefinitionLocator
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Lazy


@Configuration
class SwaggerConfig @Autowired constructor(private val locator: RouteDefinitionLocator) {

    @Bean
    @Lazy(false)
    fun openApiGroups(): List<GroupedOpenApi> {
        val groups = ArrayList<GroupedOpenApi>()
        val definitions = locator.routeDefinitions.collectList().block()!!
        definitions.filter { 
            it.id.matches(".*-serivce".toRegex())
        }.forEach{
            val name = it.id.replace("-service", "")
            val api = GroupedOpenApi.builder().pathsToMatch("/api/$name/**").group(name).build()
            groups.add(api)
        }
        
        return groups
    }
}
