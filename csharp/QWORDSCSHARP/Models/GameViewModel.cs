using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QWORDSCSHARP.Models
{
    public class GameViewModel
    {       
        public string Word { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public int Attempts { get; set; }
        public string Result { get; set; } = string.Empty;
        public GameStatus Status { get; set; } 
        public string Guess {get;set;} = string.Empty;

    }
}
