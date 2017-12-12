using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ThreeTestApp.Startup))]
namespace ThreeTestApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
