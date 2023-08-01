<?php

namespace App\Mail;

use App\Models\Product;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewProductNotification extends Mailable
{
    use Queueable, SerializesModels;
    public Product $product;

    public function __construct($product)
    {
        $this->product = $product;
    }
    public function build()
    {
        //http://localhost:3000/collections/meo/miu
        $product_id  = Product::find($this->product->id);
        $productUrl = "http://localhost:3000/collections/" . $product_id->category->slug . "/" . $this->product->slug;
        return $this->from('petshop@gmail.com', 'Pet Shop')
            ->subject('Sản phẩm mới từ PetShop')
            ->view('emails.index')
            ->with('product', $this->product)
            ->with('productUrl', $productUrl);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'PetShop vừa có một sản phẩm mới',
        );
    }

    /**
     * Get the message content definition.
     */
    // public function content(): Content
    // {
    //     return new Content(
    //         view: 'view.name',
    //     );
    // }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
