using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThreeTestApp.App.Shaders;

namespace ThreeTestApp.Controllers
{
    public class GameController : Controller
    {
        ShaderMaster shademaster = new ShaderMaster();

        // GET: Game
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetMaterials()
        {
            var materials = shademaster.GetMaterials();
            return Json(materials, JsonRequestBehavior.AllowGet);
        }
    }
}