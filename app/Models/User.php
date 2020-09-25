<?php

namespace App\Models;

use Laravel\Spark\User as SparkUser;
use Laravel\Scout\Searchable;

class User extends SparkUser
{
  use Searchable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['name', 'email'];

  /**
   * Get the value used to index the model.
   *
   * @return mixed
   */
  public function getScoutKey()
  {
    return $this->email;
  }

  /**
   * Get the key name used to index the model.
   *
   * @return mixed
   */
  public function getScoutKeyName()
  {
    return 'email';
  }

  /**
   * Get the indexable data array for the model.
   *
   * @return array
   */
  public function toSearchableArray()
  {
    $array = $this->toArray();

    // Applies Scout Extended default transformations:
    // $array = $this->transform($array);

    // Add an extra attribute:
    $array['added_month'] = substr($array['created_at'], 0, 7);

    return $array;
  }

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = [
    'password',
    'remember_token',
    'authy_id',
    'country_code',
    'phone',
    'two_factor_reset_code',
    'card_brand',
    'card_last_four',
    'card_country',
    'billing_address',
    'billing_address_line_2',
    'billing_city',
    'billing_zip',
    'billing_country',
    'extra_billing_information',
  ];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
    'trial_ends_at' => 'datetime',
    'uses_two_factor_auth' => 'boolean',
  ];
}
