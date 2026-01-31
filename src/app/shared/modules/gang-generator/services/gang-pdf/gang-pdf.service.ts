import { PdfPageSettings, PdfLineHeight } from './../../../../enums/pdf-page-settings';
import { jsPDF } from 'jspdf';
import { CpGang } from './../../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GangPdfService {

  savePDF(gangs: Array<CpGang>): void {
    const pdf = new jsPDF();
    let line = PdfPageSettings.MARGIN_TOP.valueOf();
    gangs.forEach((gang) => {
      line = this.addGangEntry(gang, pdf, line);
      line = this.checkLine(line, pdf);
    });
    pdf.save('Cyberpunk_Gang_List');
  }

  private addGangEntry(gang: CpGang, pdf: jsPDF, line: number): number {
    pdf.setFont(undefined, 'bold');
    pdf.text(
      gang.name.toUpperCase(),
      PdfPageSettings.MARGIN_LEFT.valueOf(),
      line
    );
    pdf.setFont(undefined, 'normal');
    line = this.checkLine(line, pdf);

    let text = `THREAT CODE: ${gang?.threatCode}`;
    line = this.printParagraphs(text, pdf, line);
    const gangName = gang?.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const gangType = gang?.type.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    text = `${gangName} are a ${gangType} gang that has a ${ gang?.member} membership. The gang has been around for ${gang?.age } with the average member's age being ${gang?.memberAge}. The gang controls ${gang?.turf} with ${gang?.expansion}.`;
    line = this.printParagraphs(text, pdf, line);
    text = `Criminal Activities include: ${gang?.crimes}`;
    line = this.printParagraphs(text, pdf, line);
    line = this.checkLine(line, pdf);
    return line;
  }

  private checkLine(line: number, pdf: jsPDF): number {
      line += PdfLineHeight.DEFAULT.valueOf();
      if(line > PdfPageSettings.PAGE_HEIGHT){
        pdf.addPage();
        return PdfPageSettings.MARGIN_TOP;
      }
      return line;
  }

  private printParagraphs(text: string, pdf: jsPDF, line: number): number {
    const paragraph = pdf.splitTextToSize(text, 200);
    paragraph.forEach((textLine) => {
      pdf.text(textLine, PdfPageSettings.MARGIN_LEFT.valueOf(), line);
     line = this.checkLine(line, pdf);
    });
    return line;
  }
}
