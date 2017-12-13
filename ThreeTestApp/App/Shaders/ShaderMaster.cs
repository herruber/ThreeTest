using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace ThreeTestApp.App.Shaders
{
    public class ShaderMaster
    {

        public struct BmMaterial
        {
            public string name { get; set; }
            public string vert { get; set; }
            public string frag { get; set; }

            public BmMaterial(string _name, string _vert, string _frag)
            {
                name = _name;
                vert = _vert;
                frag = _frag;
            }
        }

        public HttpServerUtility server = HttpContext.Current.Server;

        //Constructor
        public ShaderMaster()
        {
            string folder = server.MapPath("/App/Shaders");
            var files = Directory.GetFiles(folder);

            string[] shaders;

            foreach (var file in files)
            {
                if (Path.GetExtension(file).ToLower() == ".txt")
                {
                    shaders = File.ReadAllText(file).Split(new string[] { "//Vert", "//Frag" }, StringSplitOptions.RemoveEmptyEntries);
                    string name = Path.GetFileName(file).Split('.')[0];

                    BmMaterial mat = new BmMaterial(name, shaders[0], shaders[1]);
                    materials.Add(mat);
                }
            }
        }

        List<BmMaterial> materials = new List<BmMaterial>();

        public List<BmMaterial> GetMaterials()
        {
            return materials;
        }
    }
}