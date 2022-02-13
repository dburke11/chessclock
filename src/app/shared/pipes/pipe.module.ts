import { NgModule } from "@angular/core";
import { TimePipe } from "./time.pipe";

@NgModule({
    exports: [TimePipe],
    declarations: [TimePipe],
}) 
export class PipeModule{

}