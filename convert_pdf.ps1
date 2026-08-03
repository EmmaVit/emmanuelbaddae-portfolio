$word = New-Object -ComObject Word.Application
$word.Visible = $false
$docxPath = "E:\MyProHub\MyPortfolio\Emmanuel_B_Addae_CV_Professional.docx"
$pdfPath = "E:\MyProHub\MyPortfolio\Emmanuel B. Addae CV.pdf"
$doc = $word.Documents.Open($docxPath)
$doc.SaveAs($pdfPath, 17) # 17 = wdFormatPDF
$doc.Close()
$word.Quit()
Write-Host "Successfully converted DOCX to PDF!"
