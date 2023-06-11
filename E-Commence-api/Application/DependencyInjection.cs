//using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        //var assembley = typeof(DependencyInjection).Assembly;

        //services.AddMediatR(configuration =>
        //configuration.RegisterServicesFromAssembly(assembley));

        //services.AddValidatorsFromAssembly(assembley);

        return services;
    }
}
