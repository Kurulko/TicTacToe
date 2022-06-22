using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Tic_Tac_Toe.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
            => View();
    }
}
